// https://mantine.dev/core/multi-select/#custom-item-component
import { Group, Avatar, Text } from "@mantine/core";
import React from "react";

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    description: string;
}

const SelectContact = React.forwardRef<HTMLDivElement, ItemProps>(
    ({ label, description, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar color="blue" />
                <div>
                    <Text>{label}</Text>
                    <Text size="xs" color="dimmed">
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
);

export default SelectContact;