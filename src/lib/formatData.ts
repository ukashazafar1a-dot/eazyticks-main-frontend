import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("ddd, Do MMMM YYYY, h:mm a");
};
