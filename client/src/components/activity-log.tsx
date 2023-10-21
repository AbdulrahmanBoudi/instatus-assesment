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
  const [searchInput, setSearchInput] = useState<string>("");
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
  useEffect(() => {
    if (data?.data) setEvents(data?.data?.events);
  }, [data]);

  useEffect(() => {
    if (searchInput.length > 0) {
      mutate(searchInput);
    } else {
      refetch().then(
        (res) => res.data?.data && setEvents(res.data?.data?.events)
      );
    }
  }, [searchInput, mutate, refetch]);

  useEffect(() => {
    if (events && data?.data?.events) {
      setEvents([...events, ...data?.data?.events]);
    }
  }, [page, refetch]);

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
            placeholder="Search name, email or action..."
            aria-label="Search"
            aria-describedby="button-addon2"
            style={{ borderColor: "#E0E0DF" }}
            value={searchInput}
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
            onClick={() => setPage((p) => p + 1)}
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
