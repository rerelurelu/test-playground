import { Button } from "@/components/elements/Button";
import { TextButton } from "@/components/elements/TextButton";
import {
	Flex,
	Modal,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

export const ConfirmModal: FC<Props> = ({ isOpen, onClose, onConfirm }) => {
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent w="600px">
				<ModalHeader>
					<Flex justifyContent="space-between">
						<Text>選択した利用者請求情報で振替依頼を確定します。</Text>
						<TextButton
							label="閉じる"
							fontWeight="normal"
							color="black"
							fontSize="xs"
							onClick={onClose}
						/>
					</Flex>
				</ModalHeader>
				<ModalFooter>
					<Button
						variant="third"
						label="キャンセル"
						onClick={onClose}
						minW="100px"
						mr="115px"
					/>
					<Button variant="primary" label="確定" onClick={onConfirm} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
