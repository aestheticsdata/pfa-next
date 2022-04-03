import axios from "axios";
import Swal from "sweetalert2";

export const loginService = async (email: string, password: string) => {
  try {
    const result = await axios.post("http://pfa.1991computer.com/api/users", {
      email,
      password,
    });
    return result.data;
  } catch (e) {
    await Swal.fire({
      title: `login error: ${e}`,
      icon: "error",
      confirmButtonText: `dismiss`,
    });
  }
};

/*
import axios from "axios";
import Swal from 'sweetalert2';
import type { Breed, DogComment, DogObject, GetDog } from "@/components/dogs/dogTypes";
import { breedSchema } from "@/components/dogs/dogTypes";


export const getBreed: GetDog = async breed => {
  try {
    const result = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    return breedSchema.parse(result.data);
  } catch (e) {
    await Swal.fire({
      title: "request from network is corrupted",
      icon: "error",
      confirmButtonText: "can't load cute dogs",
    })
    console.log('error', e);
  }
}


export const getBreedComment = async (breed: Breed): Promise<DogComment> => {
  const result = await axios.get(`http://localhost:3004/${breed}`);
  return result.data;
}

const headers = {
  'Content-Type': 'application/json',
};

export const postBreedComment = async (breed: Breed, data: DogComment) => {
  await axios.post(`http://localhost:3004/${breed}`, {...data}, { headers });
}

 */
