import { MultiSelect, SelectItem } from "@mantine/core";
import { Group, Avatar, Text } from "@mantine/core";
import React from "react";

// https://mantine.dev/core/multi-select/#custom-item-component
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
//

type Props = {
    data: readonly (string | SelectItem)[];
    value: string[];
    onChange: (value: string[]) => void;
    error?: React.ReactNode
}

const MultiSelectContacts: React.FC<Props> = (props) => <MultiSelect
    error={props.error}
    data={props.data}
    value={props.value}
    onChange={props.onChange}
    my="xl"
    size="md"
    label="Your attendees"
    withAsterisk
    placeholder="Pick the ones invited"
    itemComponent={SelectContact}
    searchable
    nothingFound="Nobody found"
    dropdownPosition="top"
    clearable
    maxDropdownHeight={600}
    filter={(value, selected, item) =>
        !selected &&
        (item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.description.toLowerCase().includes(value.toLowerCase().trim()))
    } />
export default MultiSelectContacts;



