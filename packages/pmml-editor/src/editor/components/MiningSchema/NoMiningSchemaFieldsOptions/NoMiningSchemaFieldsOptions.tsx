/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from "react";
import {} from "@patternfly/react-core/dist/js/components/Title";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  EmptyStateHeader,
} from "@patternfly/react-core/dist/js/components/EmptyState";
import { BoxesIcon } from "@patternfly/react-icons/dist/js/icons/boxes-icon";

const NoMiningSchemaFieldsOptions = () => {
  return (
    <EmptyState variant={EmptyStateVariant.lg}>
      <EmptyStateHeader
        titleText="No Data Fields defined"
        icon={<EmptyStateIcon icon={BoxesIcon} />}
        headingLevel="h4"
      />
      <EmptyStateBody>
        Mining schema can only include fields from the Data Dictionary. It seems there are none yet. Go to the Data
        Dictionary and come back after creating them.
      </EmptyStateBody>
    </EmptyState>
  );
};

export default NoMiningSchemaFieldsOptions;
