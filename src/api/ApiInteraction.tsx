import axios from "axios";
import {BookDto} from "./BookDto";

export const fetchData = async (): Promise<BookDto[]> => {
  return axios
    .get<BookDto[]>('https://fakerestapi.azurewebsites.net/api/v1/Books')
    .then(res => res.data)
    .catch(() => [])
}