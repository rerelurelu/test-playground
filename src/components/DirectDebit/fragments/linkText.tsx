// TODO: elements配下に移動させるかは検討

import { Text, type TextProps } from "@chakra-ui/react";
import type { FC } from "react";

export const LinkText: FC<TextProps> = ({ children, ...props }) => {
	return (
		<Text
			as="span"
			color="#286FF4"
			cursor="pointer"
			fontWeight="normal"
			_hover={{ textDecoration: "underline" }}
			{...props}
		>
			{children}
		</Text>
	);
};
