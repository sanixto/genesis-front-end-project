import handlerErrors from '../handlerErrors';

class API {
  #host = 'https://api.wisey.app';

  #version = 'api/v1';

  #relUrl;

  #setRelUrl = (url) => {
    this.#relUrl = url;
  };

  #getUrl = () => `${this.#host}/${this.#version}/${this.#relUrl}`;

  #fetch(pars) {
    const params = new URLSearchParams(pars);

    return fetch(`${this.#getUrl()}?${params}`).then((response) => {
      if (!response.ok) {
        throw new Error(handlerErrors.get(response.status));
      }
      return response.json();
    });
  }

  fetchCourses(token) {
    this.#setRelUrl('core/preview-courses');
    return this.#fetch({ token }).then((data) => data.courses);
  }

  fetchCourse(token, courseId) {
    this.#setRelUrl(`core/preview-courses/${courseId}`);
    return this.#fetch({ token });
  }

  fetchToken() {
    this.#setRelUrl('auth/anonymous');
    return this.#fetch({ platform: 'subscriptions' }).then(
      (data) => data.token
    );
  }
}

export default new API();
