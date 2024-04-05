import { TextButton } from "@/components/elements/TextButton";
import type { FC } from "react";

type Props = {
	onClick: () => void;
};
export const CloseButton: FC<Props> = ({ onClick }) => (
	<TextButton
		label="閉じる"
		fontWeight="normal"
		color="black"
		fontSize="xs"
		onClick={onClick}
	/>
);
