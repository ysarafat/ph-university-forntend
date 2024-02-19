/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcadmicFaculty } from "../../../types";
export type TTableData = Pick<
  TAcadmicFaculty,
  "name" | "createdAt" | "updatedAt"
>;
const columns: TableColumnsType<TTableData> = [
  {
    title: "Faculty Name",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Created At",
    key: "createdAt",
    dataIndex: "createdAt",
  },
  {
    title: "Update At",
    key: "updatedAt",
    dataIndex: "updatedAt",
  },

  {
    title: "Action",
    key: "x",
    render: () => {
      return (
        <div>
          <Button>Update</Button>
        </div>
      );
    },
  },
];

const AcademicFaculty = () => {
  const {
    data: FacultyData,

    isFetching,
  } = useGetAllAcademicFacultyQuery(undefined);
  const tableData = FacultyData?.data?.map(
    ({ _id, name, createdAt, updatedAt }) => ({
      key: _id,
      name,
      createdAt,
      updatedAt,
    })
  );
  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    _extra
  ) => {
    // if (extra.action === "filter") {
    //   const queryParams: TQueryParam[] = [];
    //   filters.name?.forEach((item) =>
    //     queryParams.push({ name: "name", value: item })
    //   );
    //   filters.year?.forEach((item) =>
    //     queryParams.push({ name: "year", value: item })
    //   );
    //   setParams(queryParams);
    // }
  };

  // console.log(academicSemester);
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicFaculty;
