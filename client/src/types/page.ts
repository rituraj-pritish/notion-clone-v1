export interface Page {
	id: string;
	name: string;
	icon?: string;
	hierarchy: {
		root: string | null;
		parent: string | null;
		children: string[];
	};
	favorite: boolean;
	deletedAt: string | null;
	createdAt: string;
	updatedAt: string;
}
