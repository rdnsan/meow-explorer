enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
  RAND = 'RAND',
}

export type PaginationParams = {
  /**
   * Number of breeds to return
   */
  limit: number;
  /**
   * The page number to use when Paginating
   */
  page: number;
};

export type ImagesQueryParams = {
  /**
   * Number of images to return between 1-100
   * default = 1
   */
  limit: number;
  /**
   * The page number to use when Paginating through the images
   * default = 0
   */
  page: number;
  /**
   * The Order to return the images in by their upload date. `RAND` = `random`
   * default = RAND
   */
  order: keyof typeof Order;
  /**
   * Only return images that have breed information
   * default = 0
   */
  has_breeds: 0 | 1;
  /**
   * The IDs of the breeds to filter the images. e.g. `?breed_ids=beng,abys`
   */
  breed_ids: string;
  /**
   * The IDs of the categories to filter the images. e.g. `?breed_ids=1,5,14`
   */
  category_ids: string;
  /**
   * Filter images that have the `sub_id` value you used when uploading them
   */
  sub_id: string;
};

type Weight = {
  imperial: string;
  metric: string;
};

export type Breed = {
  weight: Weight;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
};

export type ThemeMode = 'dark' | 'light';
