import CreateBookmark from "@/components/shared/forms/CreateBook";
import { fetchUserData } from "@/lib/api";

const CreateBookmarkPage = async () => {
  const {collections} = await fetchUserData();
  return (
    <div className="mt-2">
      <CreateBookmark collections={collections!} />
    </div>
  );
};

export default CreateBookmarkPage;
