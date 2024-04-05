import { Center, Divider, Flex, type FlexProps, Text } from "@chakra-ui/react";
import React, { type FC } from "react";

interface HeadingProps extends FlexProps {
	text: string;
}

export const Heading: FC<HeadingProps> = ({ ...props }) => {
	return (
		<Flex {...props}>
			<Center>
				<Divider
					h="18px"
					w="5px"
					bg="#06BCD4"
					opacity={1}
					borderBottomWidth={0}
				/>

				<Text ml={2} fontSize="18px" fontWeight={600} lineHeight="18px">
					{props.text}
				</Text>
			</Center>
		</Flex>
	);
};
