import { Button, type ButtonProps, Input } from "@chakra-ui/react";
import { type FC, type ReactNode, useRef } from "react";

//button側のonChangeとonClick競合するため除外
type Props = Omit<ButtonProps, "onChange" | "onClick"> & {
	accept?: string;
	multiple?: boolean;
	children: ReactNode;
	onChange: (files: FileList) => void;
};

export const FileInput: FC<Props> = ({
	accept,
	multiple,
	children,
	onChange,
	...props
}) => {
	const ref = useRef<HTMLInputElement>(null);
	return (
		<Button onClick={() => ref.current?.click()} {...props}>
			{children}
			<Input
				hidden
				ref={ref}
				type="file"
				multiple={multiple}
				accept={accept}
				onChange={({ target }) => {
					if (!target.files) {
						console.log("CSVファイルの読み込みに失敗しました。");
						return;
					}
					onChange(target.files);
					//note: ブラウザの仕様で同じファイルを選択してもchangeイベントが発火しないため、valueをクリアする
					if (ref.current) ref.current.value = "";
				}}
			/>
		</Button>
	);
};
