import { MultiSelect, SelectItem } from "@mantine/core";
import SelectContact from "./Cards/MultiSelectContactCard";

type Props = {
    data: readonly (string | SelectItem)[];
    value: string[];
    onChange: (value: string[]) => void
}

const MultiSelectContacts: React.FC<Props> = (props) => <MultiSelect
    data={props.data}
    value={props.value}
    onChange={props.onChange}
    my="xl"
    size="md"
    label="Your attendees"
    withAsterisk
    placeholder="Pick all that you would like to invite"
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