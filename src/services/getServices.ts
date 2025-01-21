import axios from "axios";

interface Service {
  _id: string;
  title: string;
  name: string;
  description: string;
  photo: {
    thumbnail: string;
    cover: string;
  };
  price: number;
}


export const getServices = async (): Promise<{ services: Service[] }> => {
  try {
    const res = await axios.get<{ services: Service[] }>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all?search=Laptop`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return { services: [] };
  }
};

