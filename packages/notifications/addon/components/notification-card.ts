import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { NotificationsService, Notification, CustomAction } from '../.';

interface NotificationCardArgs {
  notification: Notification;
}

export default class NotificationCard extends Component<NotificationCardArgs> {
  @service notifications!: NotificationsService;

  get styles(): unknown {
    return htmlSafe(
      `transition-duration: ${this.args.notification.transitionDuration}ms`
    );
  }

  @action remove(): void {
    this.notifications.remove(this.args.notification);
  }

  @action pause(): void {
    if (this.args.notification.timer) {
      this.args.notification.timer.pause();
    }
  }

  @action resume(): void {
    if (this.args.notification.timer) {
      this.args.notification.timer.resume();
    }
  }

  @action handleClickCustomAction(customAction: CustomAction): void {
    customAction.onClick();
    this.remove();
  }
}