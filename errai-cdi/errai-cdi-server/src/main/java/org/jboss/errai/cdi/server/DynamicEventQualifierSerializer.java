/**
 * Copyright (C) 2016 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.jboss.errai.cdi.server;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Collection;

import org.jboss.errai.codegen.util.CDIAnnotationUtils;
import org.jboss.errai.enterprise.client.cdi.EventQualifierSerializer;

/**
 * A specialization of {@link EventQualifierSerializer} that uses the Java Reflection API to serialize qualifiers.
 *
 * This implementation is used in scenarios where a statically generated {@link EventQualifierSerializer} has not been
 * packaged in a deployment and cannot be generated when the application bootstraps.
 *
 * @author Max Barkley <mbarkley@redhat.com>
 */
public class DynamicEventQualifierSerializer extends EventQualifierSerializer {

  @Override
  public String serialize(final Annotation qualifier) {
    if (!serializers.containsKey(qualifier.annotationType().getName())) {
      serializers.put(qualifier.annotationType().getName(), createDynamicSerializer(qualifier.annotationType()));
    }

    return super.serialize(qualifier);
  }

  private Entry createDynamicSerializer(final Class<? extends Annotation> annotationType) {
    final EntryBuilder builder = EntryBuilder.create();

    final Collection<Method> annoAttrs = CDIAnnotationUtils.getAnnotationAttributes(annotationType);
    for (final Method attr : annoAttrs) {
      builder.with(attr.getName(), anno -> {
        try {
          return attr.invoke(anno).toString();
        } catch (Exception e) {
          throw new RuntimeException(String.format("Could not access '%s' property while serializing %s.", attr.getName(), anno.annotationType()), e);
        }
      });
    }

    return builder.build();
  }
}
