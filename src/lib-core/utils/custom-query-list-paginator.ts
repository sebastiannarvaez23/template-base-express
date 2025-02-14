import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";


export class CustomQueryListPaginator {

    private sequelize: Sequelize;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    async execute<T>(
        query: string,
        params: { replacements?: Record<string, any>, pagination?: { offset: number; limit: number } }
    ): Promise<{ count: number; rows: T[] }> {
        const { replacements = {}, pagination } = params;
        const { offset = 0, limit = 10 } = pagination || {};

        const countQuery = `SELECT COUNT(*) as total FROM (${query}) AS subquery`;
        let total: number;

        try {

            const countResult: any[] = await this.sequelize.query(countQuery, {
                replacements,
                type: QueryTypes.SELECT,
            });
            total = countResult[0]?.total || 0;

            const paginatedQuery = `${query} LIMIT :limit OFFSET :offset`;
            const rows = await this.sequelize.query(paginatedQuery, {
                replacements: { ...replacements, limit, offset },
                type: QueryTypes.SELECT,
            }) as T[];

            return {
                count: total,
                rows,
            };

        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
            throw error;
        }
    }
}
