/*
 * Copyright 2011 JBoss, a divison Red Hat, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.jboss.errai.bus.client.framework;

import org.jboss.errai.bus.client.api.Message;
import org.jboss.errai.bus.client.api.MessageCallback;
import org.jboss.errai.bus.client.api.base.DefaultErrorCallback;
import org.jboss.errai.bus.client.api.base.TransportIOException;
import org.jboss.errai.bus.client.tests.AbstractErraiTest;
import org.jboss.errai.common.client.protocols.MessageParts;

/**
 * Error handling tests
 * 
 * @author Christian Sadilek <csadilek@redhat.com>
 */
public class ErrorHandlingTest extends AbstractErraiTest {

  @Override
  public String getModuleName() {
    return "org.jboss.errai.bus.ErraiBusTests";
  }
  
  private Throwable caught;
  
  public void testBasicErrorHandling() {
    caught = null;
   
    runAfterInit(new Runnable() {
      public void run() {
        
        // this is just to get a status code other than 200 -> TransportIOException
        ((ClientMessageBusImpl)bus).IN_SERVICE_ENTRY_POINT = "invalid.url";
        
        bus.subscribe(DefaultErrorCallback.CLIENT_ERROR_SUBJECT, new MessageCallback() {
          @Override
          public void callback(Message message) {
              caught = message.get(Throwable.class, MessageParts.Throwable);
              assertNotNull("Throwable is null.", caught);
              try {
                throw caught;
              } 
              catch(TransportIOException e) {
                finishTest();
              }
              catch (Throwable throwable) {
                fail("Received wrong Throwable.");
              }
          }
        });
      }
    });
  }
}
