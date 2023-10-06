import React from "react";

import {
  Html,
  Head,
  Body,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ScheduleEmailType = {
  name: string;
  fullname: string;
  time: string;
};

export default function EmailTemplate({ fullname, name, time }: ScheduleEmailType) {


  return (
    <Html>
      <Preview>New message from Healthy Clinic</Preview>
        <Body>
          <Container>
            <Section>
              <Heading className="text-lg">
                You recieved the following message from Healthy Clinic
              </Heading>
              <Text className="text-green-700">
                Dear {fullname}, We would like to inform you that your scheduled
                appointment with Dr. {name} has been confirmed for the specified
                time "{time}". We kindly request your punctual arrival.
              </Text>
            </Section>
          </Container>
        </Body>
    </Html>
  );
}
