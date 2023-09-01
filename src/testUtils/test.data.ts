import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { SECRET_URL, getDataPrefixUrl } from "@/app/config";

const shortListData =   [
  {
    "id": 1,                   // ID of the entity
    "lat": -33.85664180722481, // geographical latitude
    "long": 151.2153396118792,
  },
  {
    "id": 2,
    "lat": -50.333,
    "long": 60.233,
  }
]

const getMemberListResponse = {
  "message": btoa(JSON.stringify(shortListData)),
};

const getMemberExtraInfoResponse1 = {
  "id": 1,
  "name": "Darth Vader",
  "height": 2.03,
  "mass": 120,
  "gender": "male",
  "homeworld": "tatooine",
  "wiki": "http://starwars.wikia.com/wiki/Anakin_Skywalker",
  "image": "https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg",
};

const getMemberExtraInfoResponse2 = {
  "id": 2,
  "name": "Palpatine",
  "height": 1.78,
  "mass": 75,
  "gender": "male",
  "homeworld": "naboo",
  "image": "https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg",
};

// Adding mock network response that is used in tests

const mockNetWorkResponse = () => {
  const mock = new MockAdapter(axios);

  mock.onGet(SECRET_URL).reply(200, getMemberListResponse);
  mock.onGet(getDataPrefixUrl('1')).reply(200, getMemberExtraInfoResponse1);
  mock.onGet(getDataPrefixUrl('2')).reply(200, getMemberExtraInfoResponse2);
  // mock.onPost(`/users/`).reply(200, getCreateUserResponse);
};

export {
  mockNetWorkResponse,
  // getCreateUserResponse,
  getMemberListResponse,
};