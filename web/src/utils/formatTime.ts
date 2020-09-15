import moment from "moment";
import "moment/locale/pt-br";

export function formatTime(date_time: Date): string {
  let date = moment(date_time).locale("pt-br").format("L");
  let time = moment(date_time).locale("pt-br").format("HH:mm");

  return `${date} às ${time}`;
}
