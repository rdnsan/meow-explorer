import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, useColorScheme, View } from 'react-native';
import { ActivityIndicator, Appbar, List, Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../components/colors';
import { apiClient } from '../services/api';
import type { Breed, ThemeMode } from '../types';

const styles = StyleSheet.create({
  appBar: {
    fontFamily: 'Lato-Bold',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    marginTop: -30,
  },
  searchBarText: {
    fontFamily: 'Lato-Regular',
  },
  title: {
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  accordion: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginBottom: 10,
  },
  accordionTitle: {
    color: colors.white,
    fontFamily: 'Lato-Bold',
  },
  accordionChild: {
    width: '100%',
    padding: 15,
    marginTop: -18,
    marginBottom: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderTopWidth: 8,
    borderStyle: 'solid',
    borderColor: colors.primary,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Lato-Regular',
  },
  emptyList: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 22,
  },
  loading: {
    marginVertical: 24,
  },
  loadingText: {
    textAlign: 'center',
    paddingTop: 10,
  },
});

export default function Home() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Breed[]>([]);

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const fetchBreeds = useCallback(async (_page = 0) => {
    setIsLoading(true);
    const query = new URLSearchParams({ limit: '10', page: _page.toString() }).toString();
    try {
      const res = await apiClient.get<Breed[]>(`/breeds?${query}`);
      if (res.status === 200) {
        setBreeds((prevState) => {
          if (_page === 0) return res.data;
          return prevState.concat(res.data);
        });
        setHasMore(res.data.length !== 0);
        setCurrentPage(_page);
      } else {
        throw new Error('Failed fetch data!');
      }
    } catch (err) {
      console.error('Failed fetch:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEndReached = useCallback(() => {
    if (!isLoading && hasMore) fetchBreeds(currentPage + 1);
  }, [isLoading, hasMore, currentPage, fetchBreeds]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      const filtered = breeds.filter((breed) =>
        breed.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    },
    [breeds]
  );

  useEffect(() => {
    fetchBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBreed = ({ item, index }: { item: Breed; index: number }) => (
    <List.Accordion
      title={`${index + 1}. ${item.name}`}
      style={styles.accordion}
      titleStyle={styles.accordionTitle}
    >
      <View style={styles.accordionChild}>
        <Image
          source={{ uri: `https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg` }}
          style={styles.image}
        />
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </List.Accordion>
  );

  const renderFooter = () => (
    <View style={styles.loading}>
      {isLoading ? (
        <React.Fragment>
          <ActivityIndicator size="small" color="#d1d5db" />
          <Text style={styles.loadingText}>Fetching{currentPage > 0 && ' more'} data</Text>
        </React.Fragment>
      ) : null}
    </View>
  );

  const renderEmpty = () => (
    <Text style={{ ...styles.emptyList, color: theme[colorScheme as ThemeMode].primary }}>
      No Data Found
    </Text>
  );

  return (
    <React.Fragment>
      <Appbar.Header>
        <Appbar.Content title="Meow Explorer" titleStyle={styles.appBar} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <Searchbar
          style={styles.searchBar}
          inputStyle={styles.searchBarText}
          mode="bar"
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchText}
        />
        <Text style={styles.title}>List of Cat Breeds</Text>
        <FlashList
          data={searchText ? (searchResults.length ? searchResults : []) : breeds}
          renderItem={renderBreed}
          estimatedItemSize={70}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </SafeAreaView>
    </React.Fragment>
  );
}
