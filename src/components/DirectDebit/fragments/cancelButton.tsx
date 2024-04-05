import { Button } from "@/components/elements/Button";
import type { FC } from "react";

type Props = {
	onClick: () => void;
};

export const CancelButton: FC<Props> = ({ onClick }) => (
	<Button variant="third" label="キャンセル" onClick={onClick} minW="100px" />
);
