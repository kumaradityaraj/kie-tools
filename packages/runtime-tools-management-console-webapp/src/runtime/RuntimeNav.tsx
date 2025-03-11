/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useMemo } from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core/dist/js/components/Nav";
import { Link, useHistory } from "react-router-dom";
import { useRuntimeSpecificRoutes } from "./RuntimeContext";

export const RuntimeNav: React.FC = () => {
  const runtimeRoutes = useRuntimeSpecificRoutes();
  const history = useHistory();

  return (
    <Nav aria-label="Nav" theme="dark" ouiaId="navigation-list">
      <NavList>
        <NavItem
          key={"process-instances-nav"}
          isActive={[runtimeRoutes.processes().pathname, runtimeRoutes.processDetails("").pathname].some((path) =>
            history.location.pathname.includes(path)
          )}
          ouiaId="process-instances"
        >
          <Link to={runtimeRoutes.processes()}>Process Instances</Link>
        </NavItem>
        <NavItem
          key={"jobs-nav"}
          isActive={history.location.pathname.includes(runtimeRoutes.jobs().pathname)}
          ouiaId="jobs"
        >
          <Link to={runtimeRoutes.jobs()}>Jobs</Link>
        </NavItem>
      </NavList>
      <NavList>
        <NavItem
          key={"task-nav"}
          isActive={[runtimeRoutes.tasks().pathname, runtimeRoutes.taskDetails("").pathname].some((path) =>
            history.location.pathname.includes(path)
          )}
        >
          <Link to={runtimeRoutes.tasks()}>Tasks</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
};
