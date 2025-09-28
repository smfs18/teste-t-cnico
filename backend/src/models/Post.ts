import { 
  DataTypes, 
  Model, 
  Optional, 
  Association, 
  HasManyGetAssociationsMixin,
  BelongsToGetAssociationMixin,
  HasManyCountAssociationsMixin,
  Sequelize, 
  InstanceUpdateOptions 
} from 'sequelize';
import { sequelize } from '../config/database';


import User from './User'; 
import Comment from './Comment';
import Like from './Like';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// O campo 'tags' foi removido da interface principal, pois será gerenciado por associação
interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'isPublished' | 'viewCount' | 'createdAt' | 'updatedAt'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public excerpt?: string;
  public imageUrl?: string;
  public isPublished!: boolean;
  public publishedAt?: Date;
  public viewCount!: number;
  public authorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  public getAuthor!: BelongsToGetAssociationMixin<User>;
  public getComments!: HasManyGetAssociationsMixin<Comment>;
  public countComments!: HasManyCountAssociationsMixin;
  public getLikes!: HasManyGetAssociationsMixin<Like>;
  public countLikes!: HasManyCountAssociationsMixin;
  // Associações com tags (Many-to-Many) seriam adicionadas aqui também

  public static associations: {
    author: Association<Post, User>;
    comments: Association<Post, Comment>;
    likes: Association<Post, Like>;
  };

  
  public async getCommentsWithAuthors(): Promise<Comment[]> {
    return this.getComments({
      include: [{
        model: User,
        as: 'author', 
      }],
      order: [['createdAt', 'ASC']]
    });
  }
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false, validate: { len: [1, 255] } },
    content: { type: DataTypes.TEXT, allowNull: false, validate: { len: [1, 50000] } },
    excerpt: { type: DataTypes.TEXT, allowNull: true },
    imageUrl: { type: DataTypes.TEXT, allowNull: true, validate: { isUrl: true } }, // Adicionada validação de URL
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    publishedAt: { type: DataTypes.DATE, allowNull: true },
    viewCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'posts',
    hooks: {
      beforeUpdate: (post: Post, options: InstanceUpdateOptions) => {
        // Define a data de publicação automaticamente quando 'isPublished' muda para true
        if (post.changed('isPublished') && post.isPublished) {
          post.publishedAt = new Date();
        }
      },
      beforeCreate: (post: Post) => {
        // Define o resumo automaticamente se não fornecido
        if (!post.excerpt && post.content) {
          post.excerpt = post.content.substring(0, 200) + '...';
        }
      }
    },
    indexes: [
      { fields: ['authorId'] },
      { fields: ['isPublished'] },
      { fields: ['publishedAt'] },
    ],
  }
);

// O campo 'tags' foi movido para uma associação Many-to-Many, que seria definida
// em um arquivo de inicialização de associações, por exemplo:
// Post.belongsToMany(Tag, { through: 'PostTags' });
// Tag.belongsToMany(Post, { through: 'PostTags' });

export default Post;