import axios from "axios";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  // Add more fields based on your API response
}

interface ServiceDetails extends Service {
  additionalInfo?: string; // Example for additional details in the service
  // Add more fields as necessary
}

export const getServices = async (): Promise<Service[]> => {
  try {
    const res = await axios.get<Service[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getServicesDetails = async (id: string): Promise<ServiceDetails> => {
  try {
    const res = await axios.get<ServiceDetails>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return {} as ServiceDetails;
  }
};
