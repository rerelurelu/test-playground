export type ServerMessage = {
	message: string | null;
	reason?: string | null;
};

export type ErrorMessage = {
	status: number;
	messages: ServerMessage[];
};

// HTTP Status Codeで使われることのない値でエラーなしを表現
export const STATUS_NOT_ERROR = -1;

// 500以外のエラー用
export type ErrorResponse = {
	warnings: ServerMessage[];
};

// 予実など特定のリクエストは成功時にErrorMessage型のアラートを返す場合がある
export type AlertResponse = {
	alertList: ServerMessage[];
};
