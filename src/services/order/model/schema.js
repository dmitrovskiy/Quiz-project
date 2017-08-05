import { Schema } from 'mongoose';
import renameId from '../../../helpers/rename-id';

const schema = new Schema(
  {
    companyName: {
      type: String,
    },
    customerAddress: {
      type: String,
    },
    orderedItem: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: renameId
    }
  }
);

export default schema;
