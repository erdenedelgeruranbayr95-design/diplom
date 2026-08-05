/* Апп-ын хэмжээнд дахин ашиглагдах hook-уудын ганц оруулах цэг.

   Домэйноос хамааралгүй (аль ч feature-д тохирох) hook-ууд ЗӨВХӨН энд байрлана.
   Домэйн-тодорхой hook-ууд өөрсдийн lib/<домэйн>/hooks/ хавтастаа үлдэнэ
   (жишээ нь lib/player/hooks, lib/socket). */
export { useAsyncResource, type AsyncResource, type AsyncResourceOptions } from "./useAsyncResource";
export { useWindowEvent, useWindowEvents, type WindowEventOptions } from "./useWindowEvent";
export { useClosingTransition } from "./useClosingTransition";
export { useFocusTrap } from "./useFocusTrap";
export { useModalShell, type ModalShell, type ModalShellOptions } from "./useModalShell";
export { useAppPreferences, readMotionPreference, MOTION_PREF_EVENT, type AppliedPreferences } from "./useAppPreferences";
export { useRailScroll, type RailScroll } from "./useRailScroll";
