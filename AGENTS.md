<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Use TanStack file routes for every shareable store page and a shared StoreShell; this preserves route metadata and navigation.
- Use authenticated server functions and a separate user_roles table for all owner catalogue mutations; browser state cannot confer owner access.
- Keep unpriced catalogue products as database drafts, hidden by public RLS; public shoppers never see fabricated offers.
- Store uploaded media in Lovable Assets pointers; native generated editorial imagery stays imported in the project.
- Customer profiles are created idempotently after verified sign-in instead of modifying the managed auth schema.
- Razorpay and ordering remain disconnected until real account credentials and inventory are supplied; never simulate a paid order.
