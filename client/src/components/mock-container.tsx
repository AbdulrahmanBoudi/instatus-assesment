import React, { useState } from "react";
import { createEvent } from "../network/services/events";
import MockLogin from "./mocks/mock-card";
import { QueryClient, useQueryClient } from "react-query";

function MockContainer() {
  const client = useQueryClient();

  return (
    <>
      <MockLogin
        buttonLabel="Mock sign in"
        primaryLabel="Username"
        secondaryLabel="Email"
        action="user.login_succeeded"
        onClick={(args) =>
          createEvent({
            email: args.input2,
            user_name: args.input1,
            action_name: args.action,
          }).then(() => client.invalidateQueries("events"))
        }
      />
      <MockLogin
        buttonLabel="Mock modify"
        primaryLabel="Email #1"
        secondaryLabel="Email #2"
        action="user.modified"
        onClick={(args) =>
          createEvent({
            email: args.input1,
            target_email: args.input2,
            action_name: args.action,
          }).then(() => client.invalidateQueries("events"))
        }
      />
    </>
  );
}

export default MockContainer;
