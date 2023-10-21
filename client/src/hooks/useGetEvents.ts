import { useQuery } from "react-query";
import { getEvents } from "../network/services/events";

const useGetEvents = ({
  page = 1,
  offset = 10,
}: {
  page: number;
  offset: number;
}) => {
  const { isLoading, error, data, isSuccess, refetch } = useQuery({
    queryKey: "events",
    queryFn: () => getEvents(page, offset),
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
    refetch,
  };
};

export default useGetEvents;
