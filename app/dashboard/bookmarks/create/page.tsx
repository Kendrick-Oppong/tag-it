import CreateBookmark from "@/components/shared/forms/CreateBook";
import { fetchUserData } from "@/lib/api";
import React from "react";

const CreateBookmarkPage = async () => {
  const {collections} = await fetchUserData();
  return (
    <div className="mt-12">
      <CreateBookmark collections={collections!} />
    </div>
  );
};

export default CreateBookmarkPage;
