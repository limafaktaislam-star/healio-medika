import { u as useActor, a as useQuery, c as createActor } from "./backend-RmgEpc2b.js";
import { f as useInternetIdentity } from "./index-BxBE-1lv.js";
function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();
  const { actor, isFetching: isActorFetching } = useActor(createActor);
  const isLoggedIn = loginStatus === "success" && !!identity;
  const principal = identity == null ? void 0 : identity.getPrincipal();
  const {
    data: role,
    isLoading: isRoleLoading,
    refetch: refetchRole
  } = useQuery({
    queryKey: ["myRole", principal == null ? void 0 : principal.toText()],
    queryFn: async () => {
      if (!actor) return null;
      const r = await actor.getMyRole();
      if (r === null || r === void 0) return null;
      if (r === "patient" || r === "nurse" || r === "admin") return r;
      return null;
    },
    enabled: isLoggedIn && !!actor && !isActorFetching,
    staleTime: 3e4
  });
  const isLoading = loginStatus === "logging-in" || isLoggedIn && (isActorFetching || isRoleLoading);
  return {
    identity,
    principal,
    role: role ?? null,
    isLoggedIn,
    isLoading,
    loginStatus,
    login,
    logout: clear,
    refetchRole
  };
}
export {
  useAuth as u
};
