import { Database } from "@/types/supabase";
import { Autocomplete, Flex, Paper, SelectItemProps, Text } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { EventHandler, FormEvent, forwardRef, useState } from "react";
interface ItemProps extends SelectItemProps {
  id: string;
  name: string;
  country: string;
  subcountry: string;
}
export const AutocompleteCities: React.FC<{ label: string, placeholder?: string, form: any, classes: any }> = ({ label, placeholder, form, classes }) => {

  const supabase = useSupabaseClient<Database>()
  const [cities, setCities] = useState<Partial<Database['public']['Tables']['cities']['Row']>[]>([])

  // eslint-disable-next-line react/display-name
  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ id, name, country, subcountry, ...other }: ItemProps, ref) => (
      <Paper ref={ref} key={id} withBorder {...other}>
        <Text ml={10} mt={10}>{name}</Text>
        <Flex ml={10} mr={10} mb={10} justify={'space-between'}>
          <Text size="xs" color="dimmed">
            {subcountry}
          </Text>
          <Text size="xs" color="dimmed">
            {country}
          </Text>
        </Flex>
      </Paper>)
  );

  // create constants for the limit
  const LIMIT = 15;

  return (
    <Autocomplete
      w={'100%'}
      label={label}
      placeholder={placeholder || label}
      limit={LIMIT}
      classNames={classes}
      itemComponent={AutoCompleteItem}
      data={cities.map((c) => ({ ...c, value: c.name }))}
      filter={() => true}
      onChangeCapture={(event: EventHandler<FormEvent<HTMLInputElement>>) => {
        const value = event.target.value || ''
        form.onChange(event)
        supabase.from('cities').select().ilike('name', `${value.toString()}%`).limit(LIMIT)
          .then(({ data, error }) => {
            console.log({ data, error })
            // setCities([])
            setCities(data || [])
          })
      }}
      {...form}
    />
  );
};