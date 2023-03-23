export class Display {

    public static event_inProgress   :string = "processed"   ;
    public static event_delivered    :string = "delivered"   ;
    public static event_opened       :string = "open"        ;
    public static event_linkClicked  :string = "click"       ;
    public static event_bounced      :string = "bounce"      ;
    public static event_delayed      :string = "deferred"    ;
    public static event_dropped      :string = "dropped"     ;

    public static display_inProgress  :string = "In progress"  ;
    public static display_delivered   :string = "Delivered"    ;
    public static display_opened      :string = "Opened"       ;
    public static display_linkClicked :string = "Link Clicked" ;
    public static display_bounced     :string = "Bounced"      ;
    public static display_delayed     :string = "Delayed"      ;
    public static display_dropped     :string = "Dropped"      ;

    public static des_inProgress   : string = "Email is being sent, refresh this page in 5-10 seconds.";
    public static des_delivered    : string = "Email has reached the recipients inbox";
    public static des_opened       : string = "Recipient read the email";
    public static des_linkClicked  : string = "Recipient visited the URL contained in this email";
    public static des_bounced      : string = "Email could not be delivered";
    public static des_delayed      : string = "Unable to deliver email at this time. Will continue to try for 72 hrs";
    public static des_dropped      : string = "zhealthcare failed to deliver this message - please contact v4support@zhealthcare.com";
}
