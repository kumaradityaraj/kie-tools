#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
@docker.io/apache/incubator-kie-kogito-data-index-ephemeral
Feature: Kogito-data-index ephemeral feature.

  Scenario: verify if all labels are correctly set on kogito-data-index-ephemeral image
    Given image is built
     Then the image should contain label maintainer with value Apache KIE <dev@kie.apache.org>
      And the image should contain label io.openshift.expose-services with value 8080:http
      And the image should contain label io.k8s.description with value Runtime image for Kogito Data Index Service for ephemeral PostgreSQL persistence provider
      And the image should contain label io.k8s.display-name with value Kogito Data Index Service - ephemeral PostgreSQL
      And the image should contain label io.openshift.tags with value kogito,data-index,data-index-ephemeral

  Scenario: verify if kogito-data-index-ephemeral container is correctly started
    When container is started with env
      | variable       | value  |
      | SCRIPT_DEBUG   | false  |
    Then container log should match regex exec java.*-Djava\.library\.path="/home/kogito/lib" -Dquarkus\.http\.host=0\.0\.0\.0 -Dquarkus\.http\.port=8080 -jar "/home/kogito/bin/quarkus-app/quarkus-run\.jar"
    And container log should contain Embedded Postgres started at port
    And container log should not contain Application failed to start

  Scenario: check if the default quarkus profile is correctly set on data index
    When container is started with env
      | variable               | value   |
      | SCRIPT_DEBUG           | false    |
    Then available container log should contain -Dquarkus.profile=http-events-support
