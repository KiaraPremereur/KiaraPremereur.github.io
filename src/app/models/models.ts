export interface Image {
  path: string;
  audio1: string;
  audio2: string;
  tip1: string;
  tip2: string;
  title: string;
}

export interface SubCategory {
  name: string;
  images: Image[];
}

export interface Category {
  title: string;
  subCategories: SubCategory[];
}

export interface Structure {
  categories: Category[];
}
