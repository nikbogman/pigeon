import { MultiSelect, SelectItem } from "@mantine/core";
import SelectContact from "../Cards/MultiSelectContactCard";

type Props = {
    data: (string | SelectItem)[];
    value: string[];
    onChange: (value: string[]) => void;
    error?: React.ReactNode
}

const MultiSelectContacts: React.FC<Props> = props => {
    return <MultiSelect
        error={props.error}
        data={props.data}
        value={props.value}
        onChange={props.onChange}
        label="Your attendees"
        withAsterisk
        placeholder="Pick the ones invited"
        itemComponent={SelectContact}
        searchable
        clearable
        nothingFound="Nobody found"
        dropdownPosition="bottom"
        maxDropdownHeight={600}
        filter={(value, selected, item) =>
            !selected &&
            (item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description.toLowerCase().includes(value.toLowerCase().trim()))
        } />
}

export default MultiSelectContacts;