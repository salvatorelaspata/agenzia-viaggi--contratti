import { Database } from "@/types/supabase";
import { Autocomplete, Flex, Paper, SelectItemProps, Text } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { forwardRef, useState } from "react";
interface ItemProps extends SelectItemProps {
  name: string;
  country: string;
  subcountry: string;
}
export const AutocompleteCities: React.FC<{ label: string, placeholder?: string, form: any, classes: any }> = ({ label, placeholder, form, classes }) => {

  const supabase = useSupabaseClient<Database>()
  const [cities, setCities] = useState<Partial<Database['public']['Tables']['cities']['Row']>[]>([])

  // eslint-disable-next-line react/display-name
  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ name, country, subcountry }: ItemProps, ref) => (
      <Paper ref={ref} withBorder >
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


  return (
    <Autocomplete
      placeholder={placeholder || label}
      label={label}
      // withAsterisk
      limit={15}
      classNames={classes}
      itemComponent={AutoCompleteItem}
      data={cities}
      {...form}
      onChangeCapture={(event) => {
        console.log(event.target.value || '')
        const value = event.target.value || ''
        form.onChange(event)
        supabase.from('cities').select().ilike('name', `${value.toString()}%`).limit(15)
          .then(({ data, error }) => {
            console.log({ data, error })
            setCities(data || [])
          })
      }}
      w={'100%'}
      filter={(item: Partial<Database['public']['Tables']['cities']['Row']>) => {
        return (item)
      }}

    // filter={(item: Partial<Database['public']['Tables']['cities']['Row']>) => {
    //   return (
    //     <Paper w={'100%'} >
    //       <Text ml='lg'>{item.name}</Text>
    //       <Text ml='lg'>{item.subcountry}</Text>
    //       <Text ml='lg'>{item.country}</Text>
    //     </Paper>)
    // }}
    />
  );
};