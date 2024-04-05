import {
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import type { FC } from "react";
import { Button } from "../elements/Button";
import { TextButton } from "../elements/TextButton";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

//todo: fragmentsからcloseButton,cancelButtonをを取り込む
export const RevertModal: FC<Props> = ({ isOpen, onClose, onConfirm }) => {
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent w="600px">
				<ModalHeader>
					<Flex justifyContent="space-between">
						<Text>振替依頼を解除しますか？</Text>
						<TextButton
							label="閉じる"
							fontWeight="normal"
							color="black"
							fontSize="xs"
							onClick={onClose}
						/>
					</Flex>
				</ModalHeader>
				<ModalBody fontSize="sm" color="#333333">
					<Text mb="10px">解除すると以下が可能になります。</Text>
					<Text>・利用者請求情報の修正、削除</Text>
					<Text>・振替依頼ファイルに含める利用者請求情報の追加や除外</Text>
					<Text mt="20px" fontSize="xs" color="#737373">
						再度、振替依頼を確定するとファイルの出力が可能になります。
					</Text>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="third"
						label="キャンセル"
						onClick={onClose}
						minW="100px"
						mr="115px"
					/>
					<Button variant="negative" label="解除" onClick={onConfirm} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
