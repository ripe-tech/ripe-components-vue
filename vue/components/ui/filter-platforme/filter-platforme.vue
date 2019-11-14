<template>
    <div class="filter-platforme">
        <div class="search-container">
            <input class="search-filter" type="text" placeholder="Search" v-model="search" />
        </div>
        <table class="table-search">
            <thead>
                <tr class="header-table">
                    <th v-for="col in cols" v-bind:key="col">
                        {{ col }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" v-bind:key="row.id">
                    <td v-for="col in cols" v-bind:key="col">
                        {{ row[col] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
@import "./assets/fonts.css";

.filter-platforme {
    font-family: MarkPro, sans-serif;
}

.filter-platforme .filter-container {
  padding-bottom: 24px;
}

.filter-platforme .search-filter {
    background-color: #f2f2f2;
    border: 1px solid transparent;
    box-sizing: border-box;
    font-size: 13px;
    height: 34px;
    line-height: 34px;
    margin-left: 24px;
    padding-left: 33px;
    padding-right: 12px;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    width: 304px;
}

.filter-platforme .search-filter:focus {
    background-color: #ffffff;
}

.filter-platforme .table-search {
    border-spacing: 0;
    text-align: center;
    width: 100%;
}

.filter-platforme .table-search .header-table > th {
    border-bottom: 1px solid #f2f2f2;
}

.filter-platforme .table-search > thead > tr > th {
    color: #8d8d8d;
    font-size: 12px;
    font-weight: 800;
    height: 36px;
    line-height: 36px;
    text-transform: uppercase;
    transition: 0.5s;
    user-select: none;
}

.filter-platforme .table-search > thead > tr > th:hover {
    color: #0d0d0d;
    transition: 0.5s;
}

.filter-platforme .table-search > tbody > tr {
    height: 80px;
}

.filter-platforme .table-search > tbody > tr > td {
  border-bottom: 1px solid #f2f2f2;
}

</style>

<script>
export const FilterPlatforme = {
    data: () => ({
        search: null,
        column: null,
        items: []
    }),
    beforeMount() {
        this.items = Array.from(Array(20), (x, i) => {
            return {
                ID: i,
                RetailID: Math.random()
                    .toString(36)
                    .substring(7),
                Brand: Math.random()
                    .toString(36)
                    .substring(7),
                Channel: Math.random()
                    .toString(36)
                    .substring(7),
                Date: Math.random()
                    .toString(36)
                    .substring(7),
                Status: Math.random()
                    .toString(36)
                    .substring(7)
            };
        });
    },
    computed: {
        cols() {
            return this.items.length >= 1 ? Object.keys(this.items[0]) : [];
        },
        rows() {
            if (!this.items.length) {
                return [];
            }

            return this.items.filter(item => {
                const props =
                    this.search && this.column ? [item[this.column]] : Object.values(item);

                return props.some(
                    prop =>
                        !this.search ||
                        (typeof prop === "string"
                            ? prop.includes(this.search)
                            : prop.toString(10).includes(this.search))
                );
            });
        }
    }
};

export default FilterPlatforme;
</script>
