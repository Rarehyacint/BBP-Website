import type { Schema, Struct } from '@strapi/strapi';

export interface TypeImage extends Struct.ComponentSchema {
  collectionName: 'components_type_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Name: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface TypeText extends Struct.ComponentSchema {
  collectionName: 'components_type_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {
    Name: Schema.Attribute.String & Schema.Attribute.Required;
    Text: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'type.image': TypeImage;
      'type.text': TypeText;
    }
  }
}
