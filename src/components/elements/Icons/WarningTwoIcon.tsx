import { WarningTwoIcon as ChakraWarningTwoIcon } from "@chakra-ui/icons";
import type { IconProps } from "@chakra-ui/react";
import type { FC } from "react";

export const WarningTwoIcon: FC<IconProps> = (props) => {
	return (
		<ChakraWarningTwoIcon
			color="#DE3624"
			w="14px"
			height="14px"
			m="0"
			{...props}
		/>
	);
};
