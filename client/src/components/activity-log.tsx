import React, { useEffect, useState } from "react";
import axios from "axios";
import { Events } from "../models/events";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { getEvents, searchEvents } from "../network/services/events";
import useGetEvents from "../hooks/useGetEvents";

function ActivityLog() {
  const headers = ["Actor", "Action", "Date"];
  const boxFields = [
    {
      title: "Actor",
      fields: [
        { title: "Name", value: "actor_name" },
        { title: "Email", value: "email" },
        { title: "Id", value: "actor_id" },
      ],
    },
    {
      title: "Action",
      fields: [
        { title: "Name", value: "action_name" },
        { title: "Object", value: "object" },
        { title: "Id", value: "action_id" },
      ],
    },
    {
      title: "Date",
      fields: [{ title: "Readable", value: "occured_at" }],
      type: "Date",
    },
    {
      title: "Metadata",
      fields: [{ title: "id", value: "metadata_id" }],
    },
    {
      title: "Target",
      fields: [
        { title: "Name", value: "target_name" },
        {
          title: "Id",
          value: "target_id",
        },
      ],
    },
  ];

  const formatDate = (date: Date, format: string) => {
    return moment(date).format(format);
  };
  const [events, setEvents] = useState<Events[]>([]);
  const [visibleRow, setVisibleRow] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isSuccess, refetch } = useGetEvents({
    page: page,
    offset: 10,
  });
  const {
    data: searchData,
    isLoading: searchLoading,
    isSuccess: searchSuccess,
    mutate,
  } = useMutation({
    mutationFn: async (input: string) => {
      const result = await searchEvents(input);

      if (result.status === 200) {
        return result.data;
      }
    },
  });

  useEffect(() => {
    if (searchSuccess && searchData) {
      setEvents(searchData);
    }
  }, [searchData, searchSuccess]);
  // useEffect(() => {
  //   if (data?.data) setEvents(data?.data?.events);
  // }, [data]);

  useEffect(() => {
    if (searchInput) {
      if (searchInput.length > 0) {
        mutate(searchInput);
      } else {
        refetch().then(
          (res) => res.data?.data && setEvents(res.data?.data?.events)
        );
      }
    }
  }, [searchInput, mutate]);

  useEffect(() => {
    if (data?.data) {
      setEvents([...events, ...data?.data?.events]);
    }
  }, [data]);

  const renderSpinner = () => {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

  const renderTableHeaders = () =>
    headers.map((action, index) => {
      return (
        <th
          scope="col"
          className={
            "px-6 py-4 " + (index === headers.length - 1 ? "w-5/12" : "")
          }
          style={{ color: "#616161" }}
        >
          {action}
        </th>
      );
    });

  const renderTableRows = () =>
    events &&
    events?.map((event, index) => {
      return (
        <>
          <tr
            className="dark:bg-white"
            onClick={() => index !== visibleRow && setVisibleRow(index)}
          >
            {index === visibleRow ? (
              <td colSpan={3}> {renderEvents(event)} </td>
            ) : (
              <>
                <td className="whitespace-nowrap px-6 py-4 font-medium flex items-center ">
                  <div className="mr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <circle
                        cx="12.5"
                        cy="12.5"
                        r="12.5"
                        fill="url(#paint0_linear_1_165)"
                      />
                      <text
                        x="50%"
                        y="50%"
                        fill="white"
                        textAnchor="middle"
                        alignment-baseline="middle"
                      >
                        {event.actor_name.charAt(0).toUpperCase()}
                      </text>
                      <defs>
                        <linearGradient
                          id="paint0_linear_1_165"
                          x1="4.01786"
                          y1="3.125"
                          x2="20.5357"
                          y2="21.875"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#F3994A" />
                          <stop offset="1" stop-color="#B325E2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  {event.email}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  {event.action_name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {formatDate(new Date(event.occured_at!), "DD MMM , hh:mm A")}
                </td>
              </>
            )}
          </tr>
        </>
      );
    });
  const renderSearch = () => {
    return (
      <div
        className="px-6 pt-4 rounded-tr-lg rounded-tl-lg"
        style={{ backgroundColor: "#f5f5f5", borderColor: "#E0E0DF" }}
      >
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.5rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-gray-400 dark:focus:border-primary"
            placeholder="Search name, id or action..."
            aria-label="Search"
            aria-describedby="button-addon2"
            style={{ borderColor: "#E0E0DF" }}
            value={searchInput ? searchInput : ""}
            onChange={(v) => {
              setSearchInput(v.target.value);
            }}
          />
        </div>
      </div>
    );
  };

  const renderEvents = (event: any) => {
    return (
      <div
        className="grid grid-cols-3 gap-4 p-5 bg-white border"
        onClick={() => setVisibleRow(null)}
      >
        {boxFields.map((element) => (
          <div className="grid grid-cols-2 text-xs content-start">
            <div className="col-span-2 text-sm" style={{ color: "#929292" }}>
              <h1 className="font-bold text-lg ">{element.title}</h1>
            </div>
            {element.fields?.map((field) => (
              <>
                <div className="font-medium" style={{ color: "#929292" }}>
                  {field.title}
                </div>
                <div className="text-black font-medium">
                  {element.type === "Date"
                    ? formatDate(event[field.value], "DD MMM , hh:mm A")
                    : event[field.value]}
                </div>
              </>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ flex: 0.8 }}>
      <div className="rounded-lg border ">
        {renderSearch()}
        <table
          className="text-left text-sm font-light rounded-bl-lg"
          style={{
            minWidth: "100%",
          }}
        >
          <thead className="font-medium dark:border-slate-50 flex-col">
            <tr
              style={{
                backgroundColor: "#f5f5f5",
              }}
            >
              {renderTableHeaders()}
            </tr>
          </thead>

          <tbody>{renderTableRows()}</tbody>
        </table>
        <div
          className="flex flex-1 px-6 py-4 rounded-br-lg rounded-bl-lg justify-center items-center"
          style={{ backgroundColor: "#f5f5f5", borderColor: "#E0E0DF" }}
        >
          <button
            className="text-gray-900 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2  dark:text-gray-400"
            type="button"
            onClick={() =>
              setPage((p) => {
                return p + 1;
              })
            }
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

ActivityLog.propTypes = {};

export default ActivityLog;
