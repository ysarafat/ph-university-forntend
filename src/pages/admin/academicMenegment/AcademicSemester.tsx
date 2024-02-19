import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicSemester = () => {
  const { data: academicSemester } = useGetAllSemestersQuery(undefined);
  console.log(academicSemester);
  return <div>Academic Semester</div>;
};

export default AcademicSemester;
