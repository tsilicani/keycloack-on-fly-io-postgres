import * as React from "react";
import { useCallback } from "react";

import { useKeycloak } from "@react-keycloak/web";

import { useAxios } from "../utils/hooks";

export default () => {
  const { keycloak } = useKeycloak();

  const axiosInstance = useAxios("http://localhost:8080"); // see https://github.com/panz3r/jwt-checker-server for a quick implementation
  const callApi = useCallback(() => {
    !!axiosInstance.current && axiosInstance.current.get("/jwt/decode");
  }, [axiosInstance]);

  return (
    <div>
      <div>User is {!keycloak?.authenticated ? "NOT " : ""} authenticated</div>

      {!!keycloak?.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}

      <button type="button" onClick={callApi}>
        Call API
      </button>
    </div>
  );
};
