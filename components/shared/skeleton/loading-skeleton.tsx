interface LoadingType {
  loadingType: "bookmarks" | "favorites" | "card-detail" | "list";
}

const LoadingSkeleton = ({ loadingType }: LoadingType) => {
  let content = null;
  switch (loadingType) {
    case "bookmarks":
    case "favorites":
      content = (
        <div className="mt-10">
          <div className="mb-8 animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1">
                <div className="w-full h-10 bg-gray-200 dark:bg-muted-foreground/40 rounded"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-24 bg-gray-200 dark:bg-muted-foreground/40 rounded"></div>
                <div className="h-10 w-24 bg-gray-200 dark:bg-muted-foreground/40 ml-3 rounded"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 mt-6">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="relative border border-gray-300 dark:border-border rounded-lg bg-background gap-0 pt-5 pb-2 px-3 space-y-4 animate-pulse"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="bg-gray-200 dark:bg-muted-foreground/40 w-10 h-10 rounded-full"></div>
                    <div className="bg-gray-200 dark:bg-muted-foreground/40 w-5 h-5 rounded-full"></div>
                  </div>
                  <div className="text-lg h-6 w-3/4 bg-gray-200 dark:bg-muted-foreground/40 rounded mb-1"></div>
                  <div className="text-muted-foreground line-clamp-2 flex items-center gap-1.5 h-5 w-12 bg-gray-200 dark:bg-muted-foreground/40 rounded"></div>
                </div>
                <div>
                  <div className="w-full h-36 bg-gray-200 dark:bg-muted-foreground/40 rounded-md mb-3 border border-border"></div>
                  <div className="text-base font-semibold line-clamp-2 h-10 bg-gray-200 dark:bg-muted-foreground/40 rounded"></div>
                </div>
                <div className="mt-auto w-full flex flex-col space-y-3">
                  <div className="flex items-center w-full justify-between">
                    <div>
                      <div className="bg-gray-200 dark:bg-muted-foreground/40 h-5 w-12 rounded"></div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full text-primary">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-muted-foreground/40 rounded"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-muted-foreground/40 rounded"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-muted-foreground/40 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case "card-detail":
      content = <div>Loading card details...</div>;
      break;
    case "list":
      content = <div>Loading list...</div>;
      break;
    default:
      content = (
        <div className="mt-24 flex flex-col items-center justify-center gap-2">
          <div className="spinner"></div>

          <p>Loading</p>
        </div>
      );
  }

  return <>{content}</>;
};

export default LoadingSkeleton;
